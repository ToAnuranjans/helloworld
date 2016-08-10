import { Pipe, PipeTransform } from 'angular2/core';

@Pipe({
    name: 'stateFilter',
})

export class MyFilterPipe implements PipeTransform {
    transform(value: any[], args: any[]): any[] {
        
        // filter items array, items which match and return true will be kept, false will be filtered out
        console.log("in filter", value);
        let filter: string = args[0] ? args[0].toLocaleLowerCase() : null;
        return filter ? value.filter(v => v.country_code.toLocaleLowerCase().indexOf(filter) != -1) : value;
    }
}