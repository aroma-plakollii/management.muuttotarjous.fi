import {useEffect, useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {getUsers} from "../../../../services/movingServiceServices/adminServices/UserService";
import {addCompany} from "../../../../services/movingServiceServices/adminServices/CompaniesService";
import { Company } from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/ICompany";
import DatePicker from "react-datepicker";
import moment from "moment";
import Autocomplete from "react-google-autocomplete";
import {GMAPKEY} from "../../../../config";
import {IUser} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IUser";
import {Loader} from "../../../../views/Loader";
const CreateCompany = () => {
    const [state, setState] = useState({
        company: {} as Company,
        loading: false,
        hasError: false,
    });

    const [address, setAddress] = useState<string>('')

    let navigate = useNavigate();

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, company: {
                ...state.company,
                [key]: value
            }
        })
    }

    const onSelectChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state,
            company: {
                ...state.company,
                [key]: value
            }
        });
    };

    const onAddressChange = (place: any) => {
        let city = "";
        place.address_components.forEach((addressComponent: any) => {
            if (addressComponent.types[0] === "locality") {
                city = addressComponent.long_name;
            }
        });

        setAddress(place.formatted_address);
    };

    const onDateChange = async (key: string,val: any) => {
        setState({
            ...state, company: {
                ...state.company,
                [key]: new Date(moment(val).format('yyyy-MM-DD'))
            }
        });
    };
    const onCreate = async () => {
        setState({...state, hasError: false});

        if (
            !state.company.first_name ||
            !state.company.last_name ||
            !state.company.email ||
            !state.company.phone
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){

            const data = {
                name: state.company.name,
                description: state.company.description,
                first_name: state.company.first_name,
                last_name: state.company.last_name,
                email: state.company.email,
                phone: state.company.phone,
                address: address,
                business_number: state.company.business_number,
                register_date: moment(state.company.register_date).format('YYYY-MM-DD'),
                private_key: state.company.private_key,
                api_key: state.company.api_key,
                is_featured: state.company.is_featured,
                status: state.company.status,
            }

            const res = await addCompany(data);

            setState({...state, loading: true});

            if (res) {
                setState({...state, loading: false});
                navigate('/companies');
            }
        }
    };

    if (state.loading) {
        return <>
            <div className="loader-container">
                <Loader color='#3642e8' width={50}/>
            </div>
        </>
    }

    return (
        <div className="content-header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title text-uppercase">Company Details</h3>
                            </div>

                            <div className="form-horizontal">
                                <div className="card-body">

                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-sm-3 col-form-label">Company Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.company.name ? 'is-invalid' : ''}`} id="name"
                                                   placeholder="John"  onChange={(val: any) => onInputChange('name', val)} value={state.company.name}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="business_number" className="col-sm-3 col-form-label">Business number</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="business_number"
                                                   placeholder="100000000" onChange={(val: any) => onInputChange('business_number', val)} value={state.company.business_number}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="description" className="col-sm-3 col-form-label">Description</label>
                                        <div className="col-sm-9">
                                            <textarea className={`form-control ${state.hasError && !state.company.description ? 'is-invalid' : ''}`} id="description"
                                                      placeholder="Description"  onChange={(val: any) => onInputChange('description', val)} value={state.company.description}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">First name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.company.first_name ? 'is-invalid' : ''}`} id="first_name"
                                                   placeholder="John" onChange={(val: any) => onInputChange('first_name', val)} value={state.company.first_name}/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="last_name" className="col-sm-3 col-form-label">Last name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.company.last_name ? 'is-invalid' : ''}`} id="last_name"
                                                   placeholder="Doe"  onChange={(val: any) => onInputChange('last_name', val)} value={state.company.last_name}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-sm-3 col-form-label">E-mail</label>
                                        <div className="col-sm-9">
                                            <input type="email" className={`form-control ${state.hasError && !state.company.email ? 'is-invalid' : ''}`} id="email"
                                                   placeholder="john.doe@email.com"  onChange={(val: any) => onInputChange('email', val)} value={state.company.email}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="phone" className="col-sm-3 col-form-label">Phone</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.company.phone ? 'is-invalid' : ''}`} id="phone"
                                                   placeholder="045000000"  onChange={(val: any) => onInputChange('phone', val)} value={state.company.phone}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="address" className="col-sm-3 col-form-label">Address</label>
                                        <div className="col-sm-9">
                                            <Autocomplete
                                                apiKey={GMAPKEY}
                                                onPlaceSelected={onAddressChange}
                                                options={{
                                                    types: ["address"],
                                                    componentRestrictions: {country: "fi"},
                                                }}
                                                defaultValue={address}
                                                id="address"
                                                placeholder="Esimerkikatu 1, Helsinki"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="register_date" className="col-sm-3 col-form-label">Register
                                            Date</label>
                                        <div className="col-sm-9">
                                            <DatePicker
                                                className={'form-control'}
                                                onChange={(val: any) => onDateChange('register_date', val)}
                                                onSelect={(val: any) => onDateChange('register_date', val)}
                                                selected={new Date(moment(state.company.register_date).format('yyyy-MM-DD'))}
                                                minDate={new Date()}
                                                dateFormat={'dd.MM.yyyy'}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="private_key" className="col-sm-3 col-form-label">Private key</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="private_key"
                                                   placeholder="Private key"  onChange={(val: any) => onInputChange('private_key', val)} value={state.company.private_key}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="api_key" className="col-sm-3 col-form-label">API key</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="api_key"
                                                   placeholder="Api key" onChange={(val: any) => onInputChange('api_key', val)} value={state.company.api_key}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="is_featured" className="col-sm-3 col-form-label">Recommended</label>
                                        <div className="col-sm-9">
                                            <select className={`form-control`} name="is_featured" id="is_featured"
                                                    onChange={(val: any) => onSelectChange('is_featured', val)}
                                                    value={state.company.is_featured}>
                                                <option value={''}>-- Choose recommendation --</option>
                                                <option value={1}>YES</option>
                                                <option value={0}>NO</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="status" className="col-sm-3 col-form-label">Status</label>
                                        <div className="col-sm-9">
                                            <select
                                                name="status"
                                                id="status"
                                                className={`form-control`}
                                                onChange={(val: any) => onSelectChange('status', val)}
                                                value={state.company.status}
                                            >
                                                <option value={''}>-- Choose status --</option>
                                                <option value={1}>Active</option>
                                                <option value={0}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={onCreate}>
                                        {state.loading ? 'Saving...' : 'Save changes'}
                                    </button>
                                    <Link to={'/companies'} className="btn btn-default float-right">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateCompany