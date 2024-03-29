type Snippet = {
    pk: number;
    title: string;
    code?: string;
    language: string;
    description?: string;
    created_date: string;
    prefix: string;
}

export default Snippet;