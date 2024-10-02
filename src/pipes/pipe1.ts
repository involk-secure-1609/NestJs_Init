import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';


// if we use the pipe on a request and we have @Body and @Query or as many more
// the pipe will be used for all of them by default 
@Injectable()
export class ToNumberPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {

    console.log('The value is: ' + value);
    console.log("the metadata type is: " + metadata.type);
    console.log("the metadata data is: "+metadata.data);
    return Number(value);
  }
}