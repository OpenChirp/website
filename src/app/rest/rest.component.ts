import { Component } from '@angular/core';
import { Http, Request, Response } from '@angular/http';
import {HttpClient, RESTClient, Client, GET, PUT, POST, DELETE, Headers, Path, Body, Query, Produces, MediaType} from 'angular-rest';

@Injectable()
@Client({
    serviceId: 'rest-service',
    baseUrl: 'http://localhost:4200/api',
    headers: {
        'content-type': 'application/json'
    }
})

export class restClient extends RestClient {

    constructor(http:Http){
        super(<HttpClient>http);
    }

    protected requestInterceptor(req: Request):void {
        if (SessionFactory.getInstance().isAuthenticated) {
            req.headers.append('jwt', SessionFactory.getInstance().credentials.jwt);
        }
    }

    protected responseInterceptor(res: Observable<Response>): Observable<any> {
        // do anything with responses
        return res;
    }

    @Get("")
    @Produces(MediaType.JSON)
    public getEntries( @Query("page") page:number, @Query("size", {default: 20}) size?:number, @Query("sort") sort?: string): Observable<Entry[]> { return null; };

    @Get("")
    @Map(resp => new Entry(resp.json()))
    public getEntryById( @Path("id") id: number): Observable<Entry>{ return null; };

    @Post("")
    @Headers({
        'content-type': 'application/json'
    })
    public postTodo( @Body entry: Entry): Observable<Response> { return null; };

    @Put("")
    public putEntryById( @Path("id") id: string, @Body todo: Entry): Observable<Response> { return null; };

    @Delete("")
    public deleteEntryById( @Path("id") id: string): Observable<Response> { return null; };

}
