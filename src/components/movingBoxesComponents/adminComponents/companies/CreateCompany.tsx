import {addCompany} from "../../../../services/movingBoxesServices/adminServices/CompaniesService";
import {useEffect, useState} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";

const CreateCompany = () => {
    const [state, setState] = useState({
        first_name: '',
        last_name: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        business_number: '',
        private_key: '',
        secret_key: '',
        api_key: '',
        status: '',
        loading: false,
        hasError: false,
    });

    let navigate = useNavigate();

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, ...state,
            [key]: value
        })
    }

    const onCreate = async () => {
        setState({...state, hasError: false});

        if (
            !state.first_name ||
            !state.first_name ||
            !state.last_name ||
            !state.name ||
            !state.email ||
            !state.phone ||
            !state.address
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }


        if (!state.hasError){
            const res = await addCompany(state);

            if (res) {
                navigate('/companies');
            }
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title text-uppercase">Company Details</h3>
            </div>

            <div className="form-horizontal">
                <div className="card-body">
                    <div className="form-group row">
                        <label htmlFor="first_name" className="col-sm-3 col-form-label">First name</label>
                        <div className="col-sm-9">
                            <input type="text" className={`form-control ${state.hasError && !state.first_name ? 'is-invalid' : ''}`} id="first_name"
                                   placeholder="John" onChange={(val: any) => onInputChange('first_name', val)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="last_name" className="col-sm-3 col-form-label">Last name</label>
                        <div className="col-sm-9">
                            <input type="text" className={`form-control ${state.hasError && !state.last_name ? 'is-invalid' : ''}`} id="last_name"
                                   placeholder="Doe" onChange={(val: any) => onInputChange('last_name', val)} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-3 col-form-label">Company name</label>
                        <div className="col-sm-9">
                            <input type="text" className={`form-control ${state.hasError && !state.name ? 'is-invalid' : ''}`} id="name"
                                   placeholder="Abcde Oy" onChange={(val: any) => onInputChange('name', val)} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="email" className="col-sm-3 col-form-label">E-mail</label>
                        <div className="col-sm-9">
                            <input type="email" className={`form-control ${state.hasError && !state.email ? 'is-invalid' : ''}`} id="email"
                                   placeholder="john.doe@email.com" onChange={(val: any) => onInputChange('email', val)} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="phone" className="col-sm-3 col-form-label">Phone</label>
                        <div className="col-sm-9">
                            <input type="text" className={`form-control ${state.hasError && !state.phone ? 'is-invalid' : ''}`} id="phone"
                                   placeholder="045000000" onChange={(val: any) => onInputChange('phone', val)} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="address" className="col-sm-3 col-form-label">Address</label>
                        <div className="col-sm-9">
                            <input type="text" className={`form-control ${state.hasError && !state.address ? 'is-invalid' : ''}`} id="address"
                                   placeholder="Esimerkikatu 1, Helsinki" onChange={(val: any) => onInputChange('address', val)} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="business_number" className="col-sm-3 col-form-label">Business number</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="business_number"
                                   placeholder="100000000" onChange={(val: any) => onInputChange('business_number', val)} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="private_key" className="col-sm-3 col-form-label">Private key</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="private_key"
                                   placeholder="Private key" onChange={(val: any) => onInputChange('private_key', val)} />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="api_key" className="col-sm-3 col-form-label">API key</label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" id="api_key"
                                   placeholder="Api key" onChange={(val: any) => onInputChange('api_key', val)} />
                        </div>
                    </div>

                    {/*<div className="form-group row">*/}
                    {/*    <label htmlFor="secrete_key" className="col-sm-3 col-form-label">Secrete key</label>*/}
                    {/*    <div className="col-sm-9">*/}
                    {/*        <input type="text" className="form-control" id="secrete_key"*/}
                    {/*               placeholder="Secret key" onChange={(val: any) => onInputChange('secret_key', val)} />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div className="form-group row">
                        <label htmlFor="status" className="col-sm-3 col-form-label">Status</label>
                        <div className="col-sm-9">
                            <select className={`form-control`} name="status" id="status"
                                    onChange={(val: any) => onInputChange('status', val)} >
                                <option selected={true}>-- Select Status --</option>
                                <option value={'1'}>ACTIVE</option>
                                <option value={'0'}>INACTIVE</option>
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
    );
}

export default CreateCompany