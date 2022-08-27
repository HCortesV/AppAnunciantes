import { SubmissionError } from "redux-form";

const BADREQUEST: number = 400;

export async function addAdvertiser(values: any) {
    let apiresponse = await fetch('api/advertiser', { method: "POST", body: JSON.stringify(values), headers: { 'Content-type': 'application/json' } })
        .then(response => {
            if (response.status == BADREQUEST)
                return response.json() as Promise<string>;
            else
                return response.json() as Promise<number>
        });



    submitError(apiresponse);
}