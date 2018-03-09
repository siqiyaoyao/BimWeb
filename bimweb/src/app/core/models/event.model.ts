
export class EventModel {
    constructor(
        public title:string,
        public location:string,
        public startDatetime:Date,
        public endDatetime:Date,
        public viewPublic:boolean,
        public description?:string,
        public _id?:string, //如果新建的时候则不存在 所以是可选属性
    ){}
}
