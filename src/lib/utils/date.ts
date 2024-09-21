
export const formatDate = (date: string) => {

    const formatted = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"

    }).format(new Date(date))
    return formatted

}
