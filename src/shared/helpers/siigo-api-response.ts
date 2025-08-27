export class SiigoApiResponse<T> {
    pagination: SiigoPagination;
    results: T;
    _links: SiigoLinks;
}

export class SiigoPagination {
    page: number;
    page_size: number;
    total_results: number;
}

export class SiigoLink {
    href: string;
}

export class SiigoLinks {
    previous: SiigoLink;
    self: SiigoLink;
    next: SiigoLink;
}