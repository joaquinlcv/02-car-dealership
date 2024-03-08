import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid'

import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        
    ];

    findAll() {
        return this.cars;
    }

    findById(Id:string) {
        const car = this.cars.find(car => car.id === Id);
        if(!car) throw new NotFoundException(`El Identificador: '${ Id }' no fue encontrado`);
        return car;
    }

    create(createCarDto: CreateCarDto){
        const car: Car = {
            id: uuid(),
            ...createCarDto
        }
        this.cars.push(car);
        return car;
    }

    update(id: string, updateCarDto: UpdateCarDto){

        let carDB = this.findById(id);
        
        this.cars = this.cars.map( car => {

            if(car.id === id) {
                carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id
                }
                return carDB;
            }
            return car;

        })

        return carDB;
    }

    delete(id:string){
        let carDB = this.findById(id);
        this.cars = this.cars.filter(car => car.id !== id);
    }

    fillCarsWithseedData( cars: Car[]) {
        this.cars = cars;
    }
}
