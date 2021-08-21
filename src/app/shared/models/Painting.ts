export class Painting {
    title: string;
    likes: number;
    description: string;
    imageURL: string;
    comments: any[];
    creatorId: string;
    constructor(
        creator: string,
        title: string,
        desciption: string,
        imageUrl: string) {
        this.creatorId = creator,
        this.title = title,
        this.likes = 0,
        this.description = desciption,
        this.imageURL = imageUrl,
        this.comments = [];
    }
}
