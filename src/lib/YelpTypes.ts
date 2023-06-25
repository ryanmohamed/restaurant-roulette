export type ErrorResponseType = {
    "error"?: {
        "code": string;
        "description": string;
    }
};  

/* 
    according to api documentation 
    https://docs.developer.yelp.com/reference/v3_business_reviews
*/

export type ReviewUserType = {
    "id": string,
    "profile_url": string | string,
    "image_url": string | null,
    "name": string | null 
}

export type ReviewType = {
    "id": string,
    "url": string,
    "text": string,
    "rating": number,
    "time_created": string,
    "user": ReviewUserType
};

export type ReviewResponseType = {
    "total": number,
    "reviews": ReviewType[],
    "possible_languages": string[]
};



/* 
    according to api documentation 
    https://docs.developer.yelp.com/reference/v3_business_search
*/

export type CategoryType = {
    "alias": string;
    "title": string;
};

export type CategoryList = CategoryType[];

export type HoursType = {
    "hour_type": string;
    "open": {
        "day": number;
        "start": string;
        "end": string;
        "is_overnight": boolean;
    };
    "is_open_now": boolean;
}

export type BusinessType = {
    "id": string;
    "alias": string;
    "name": string;
    "image_url": string;
    "is_closed": boolean;
    "url": string; 
    "review_count": string | number;
    "categories": CategoryList;
    "rating": string | number;
    "coordinates": {
        "latitude": number;
        "longitude": number;
    };
    "transactions": string[];
    "price"?: string;
    "location"?: {
        "address1"?: string;
        "address2"?: string | null;
        "address3"?: string | null;
        "city"?: string;
        "zip_code"?: string;
        "country"?: string;
        "state"?: string;
        "display_address": string[];
        "cross_streets"?: string | null;
    };
    "phone": string;
    "display_phone": string;
    "distance"?: string | number;
    "hours"?: HoursType[];
    "attribute"?: any; /* mainly depends on our request but in our case in neglible */
}

export type SearchResponseType = {
    "businesses": BusinessType[];
    "total": number;
    "region": {
        "latitude": string | number;
        "longitude": string | number;
    }
}