import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { addAdvertiser, processAdvertiser } from '../calls/AdvertiserCalls';
import { actionCreators } from '../store/Advertisers';



const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
            <input className="form-control" {...input} placeholder={label} type={type} />
            
            {touched && error && <div className="text-danger">
                {error}
            </div>}
    </div>
)

let AdvertiserForm = (props: any) => {

    const [cancel, setCancel] = useState(false);

    const isLoading = useSelector((state) => state.advertisers.isLoading);
    const redirect = useSelector((state) => state.advertisers.redirect);

    const dispatch = useDispatch();
    useEffect(() => {
        if (props.match.params.id)
            dispatch(actionCreators.requestAnAdvertiser(props.match.params.id));
    }, [dispatch]);

    if (cancel)
        dispatch(actionCreators.cancelSaveAdvertiser());

    if (redirect) {
        return (
            <Redirect to="/list-advertisers" />
        )
    }

    const { error, handleSubmit } = props;

    return <>
        <form onSubmit={handleSubmit} noValidate >
            <Field name="id" type="hidden" component="input" />
            <div className="form-row form-group">
                <div className="col-md-4 mb-3">
                    <Field
                        name="rut"
                        className="form-control"
                        component="input"
                        type="text"
                        component={renderField}
                        label="Rut"
                    />
                    </div>
                <div className="col-md-4 mb-3">
                    <Field
                        name="name"
                        className="form-control"
                        component="input"
                        type="text"
                        component={renderField}
                        label="Name"
                    />
                    </div>
                </div>
            <div className="form-row form-group">
                <div className="col-md-12 mb-3">
                    <Field
                        name="description"
                        className="form-control"
                        component="input"
                        type="text"
                        component={renderField}
                        label="Description"
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="col-md-4 mb-3">
                    <Field
                        name="phone"
                        className="form-control"
                        component="input"
                        type="text"
                        component={renderField}
                        label="Phone"
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <Field
                        name="address"
                        className="form-control"
                        component="input"
                        type="text"
                        component={renderField}
                        label="Address"
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <Field className="form-control" name="Country" component="select">
                        <option value="">Country</option>
                        <option value="Chile">Chile</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Colombia">Colombia</option>
                        <option value="Peru">Peru</option>
                        <option value="Mexico">Mexico</option>
                        <option value="Uruguay">Uruguay</option>
                    </Field>
                </div>
            </div>
            <div>
                <button className="btn btn-dark float-right offset-1" type="submit">Save</button>
                <button className='btn btn-danger float-right' onClick={()=>setCancel(true)}>Cancel</button>
            </div>
        </form>
        {isLoading && <strong>Saving...</strong>}
        {error && <strong>{error}</strong>}
    </>
}


AdvertiserForm= reduxForm({
    form: 'advertiserForm',
    onSubmit: processAdvertiser,
    enableReinitialize: true
})(AdvertiserForm);

AdvertiserForm = connect(
    state => ({
        initialValues: state.advertisers.advertiser
    }),
    { load: actionCreators.requestAnAdvertiser }
)(AdvertiserForm);

export default AdvertiserForm;