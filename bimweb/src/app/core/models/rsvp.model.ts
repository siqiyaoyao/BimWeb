export class RsvpModel {
    constructor(
        public useId: string,
        public name: string,
        public eventId: string,
        public attending: boolean,
        public geststs?: number,
        public comments?: string,
        public _id?: string,
    ){}
}
