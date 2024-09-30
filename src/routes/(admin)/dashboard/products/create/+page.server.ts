import { superValidate } from "sveltekit-superforms"
import type { RequestEvent } from "../$types"
import { ProductCreationSchema } from "$lib"
import { zod } from "sveltekit-superforms/adapters"
import { fail, redirect } from "@sveltejs/kit"
import { createNewProduct } from "$lib/server/db/models/products"
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from '$env/static/private';

// Configure Cloudinary
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

export async function load(event: RequestEvent) {
    const form = await superValidate(event, zod(ProductCreationSchema))
    return {
        form
    }
}

export const actions = {
    default: async (event: RequestEvent) => {
        const formData = await event.request.formData();
        const form = await superValidate(formData, zod(ProductCreationSchema));

        console.log(form)
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        const userId = event.locals.user.id
        console.log(userId)

        try {
            console.log(form.data)
            const productImage = formData.get('productImage');
            let imageUrl = form.data.prodImage; // Use the URL if provided

            // If a file was uploaded, process it with Cloudinary
            if (productImage instanceof File && productImage.size > 0) {
                try {
                    const result = await uploadToCloudinary(productImage);
                    imageUrl = result.secure_url;
                } catch (error) {
                    console.error('Error uploading image:', error);
                    return fail(400, { form, error: "Failed to upload image" });
                }
            }

            await createNewProduct({
                userId: userId,
                ...form.data,
                prodImage: imageUrl // Use the Cloudinary URL or the provided URL
            })
        } catch (error) {
            console.error('Error creating product:', error);
            return fail(400, { form, error: "Problem creating new product" });
        }

        throw redirect(302, "/dashboard/products")
    }
}

async function uploadToCloudinary(file: File): Promise<{ secure_url: string }> {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "product-images",
                format: "webp", // Convert to WebP format
                transformation: [
                    { width: 400, crop: "scale" }, // Resize to 400px width
                ]
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        file.arrayBuffer().then(arr => {
            const buffer = Buffer.from(arr);
            uploadStream.end(buffer);
        });
    });
}
