<script>
    const services = [
        {
            title: "Shipping & Delivery",
            description:
                "Free delivery within Constantine and convenient cash-on-delivery service.",
            icon: "bx bx-package",
        },
        {
            title: "Returns & Refunds",
            description:
                "Hassle-free returns for valid reasons—100% money-back guarantee.",
            icon: "bx bx-wallet",
        },
        {
            title: "Secure Payments",
            description:
                "We offer fully secure payment options. Your transactions are always protected.",
            icon: "bx bx-shield",
        },
        {
            title: "Product Quality",
            description:
                "Our products undergo rigorous quality checks to ensure premium quality.",
            icon: "bx bx-check-double",
        },
    ];
</script>

<section class="py-16 mt-8">
    <div class="container mx-auto px-4">
        <h2 class="text-center text-4xl font-bold mb-10">Our Services</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {#each services as service}
                <div
                    class="card p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300 ease-in-out"
                >
                    <div class="card-body">
                        <div class="icon mb-4 text-primary text-5xl">
                            <i class={`${service.icon} text-accent`}></i>
                        </div>
                        <h3 class="font-bold text-2xl mb-4">{service.title}</h3>
                        <p class="">{service.description}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>
