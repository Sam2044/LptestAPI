import { AppDataSource } from '../data-source'
import { NextFunction, Request, Response } from "express"
import { Test } from '../entity/Test'


export class TestController{
    private testRepository = AppDataSource.getRepository(Test)

    async all(request: Request, response: Response, next: NextFunction) {
        var traces = [];
        var trace = {};

        let tests = await this.testRepository.find();

        for(let test of tests){
            trace = {
                        "trace_id": test.trace_id,
                        "trace_data": buildArrayOfSignedIntegers(getHex(test.trace_data)),
                        "trace_time": test.trace_time
                    };

        traces.push(trace);
        }

        return traces;
        
    }

    
}

function getHex(buffer: Buffer):string{
    return buffer.toString('hex');
}

function buildArrayOfSignedIntegers(hex_string: string){

    let signedIntegers: Array<number> = [];

    if(hex_string.length === 0){
        throw new Error('Hex string must not be an empty string')
    }

    if (hex_string.length % 2 !== 0) {
        throw new Error('Hex string must be a multiple of 2');
    }

    var i = 0
   
    //at the last iteration, pad the end with zeros in order to make the hexsubstring a multiple of 8
    while (i < hex_string.length) {
        let bufferLength = Math.min(hex_string.length - i, 8)
        let buffer = Buffer.from(hex_string.substring(i, i + bufferLength).padEnd(8, '0'), 'hex');
        let signed32bitInt = buffer.readInt32LE(0);
        signedIntegers.push(signed32bitInt/10000000);
        i += 8;
    }


    return signedIntegers
    
}
