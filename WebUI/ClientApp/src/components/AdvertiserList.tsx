import React, { FunctionComponent, useEffect } from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from 'react-router';
import * as AdvertiserStore from '../store/Advertisers';
import { Advertiser, AdvertiserState } from '../models/AdvertiserModels';
import { actionCreators } from '../store/Advertisers';
import { ApplicationState } from '../models/ApplicationModels';
import { Link } from 'react-router-dom';

type AdvertiserProps =
    AdvertiserState &
    typeof AdvertiserStore.actionCreators &
    RouteComponentProps<{}>;

const AdvertiserList: FunctionComponent<AdvertiserProps> = (props) => {

    const deleted = useSelector((state) => state.advertisers.deleted);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionCreators.requestAdvertisers(0));
    }, [dispatch]);

    function removeAdvertiser(idAdvertiser: number): void{
        dispatch(actionCreators.deleteAdvertiser(idAdvertiser));
    };

    if (deleted)
        dispatch(actionCreators.requestAdvertisers(0));

    return <>
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Rut</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Country</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {props.advertiservm?.advertisers.map((advertiser: Advertiser) =>
                    <tr key={advertiser.id}>
                        <td>{advertiser.rut}</td>
                        <td>{advertiser.name}</td>
                        <td>{advertiser.description}</td>
                        <td>{advertiser.address}</td>
                        <td>{advertiser.phone}</td>
                        <td>{advertiser.country}</td>
                        <td>
                            <Link to={`/form-advertiser/edit/${advertiser.id}`}>
                                <button className='btn btn-primary' >Edit</button>
                            </Link>
                            <button className='btn btn-danger offset-1' onClick={() => { if (window.confirm('Delete this item?')) removeAdvertiser(advertiser.id) } }>Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
        <Link className="float-right" to="/form-advertiser/create">
            <button className='btn btn-dark'>Add</button>
            </Link>
        </>
}


export default connect(
    (state: ApplicationState) => state.advertisers,
    AdvertiserStore.actionCreators
)(AdvertiserList);
