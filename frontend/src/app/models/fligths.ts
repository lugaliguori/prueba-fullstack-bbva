export class forecast {
    date: string;
    condition: string;
    icon: string;
    maxtemp: number;
    mintem: number;
    humidity: number

    constructor(obj? : any){
        this.date = obj && obj['date'] || null;
        this.condition = obj && obj['day'] && obj['day']['condition'] && obj['day']['condition']['text'] || null;
        this.icon = obj && obj['day'] && obj['day']['condition'] && obj['day']['condition']['icon'] || null;
        this.maxtemp = obj && obj['day'] && obj['day']['maxtemp_c'] || null
        this.mintem = obj && obj['day'] && obj['day']['mintemp_c'] || null
        this.humidity = obj && obj['day'] && obj['day']['avghumidity'] || null
    }
}

export class flights {
    companyName: string;
    airportArrival: string;
    airportLeave: string;
    price: string;
    thumbnail: string;

    constructor(obj?: any) {
        this.companyName = obj && obj['companyName'] || null;
        this.airportArrival = obj && obj['airportArive'] || null;
        this.airportLeave = obj && obj['airportLeave'] || null;
        this.price = obj && obj['price'] || null;
        this.thumbnail = obj && obj['thumbnail'] || null;
        
    }


}