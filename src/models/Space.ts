import {ISpace} from '../types/space.types'

export class Space{
    id:string;
    name:string;
    description:string;

    constructor(data:ISpace){
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
    }

    get idSpace():string{
        return this.id;
    }    

    get nameSpace():string{
        return this.name;
    }
    get descriptionSpace():string{
        return this.description;
    }

    toJSON(){
        return{
            id: this.id,
            name: this.name,
            description:this.description
        };
    }

    static fromResponse(data:ISpace):Space{
        return new Space(data);
    };
}