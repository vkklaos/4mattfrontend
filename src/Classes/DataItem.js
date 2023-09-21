export class DataItem
{
    constructor (date, category, application, spend, actives, inactives) {
        this.date = new Date(date);
        this.category = category;
        this.application = application;
        this.spend = parseInt(spend);
        this.actives = parseInt(actives);
        this.inactives = parseInt(inactives);
    }
}