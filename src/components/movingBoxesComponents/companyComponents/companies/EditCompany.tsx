import {useEffect, useState} from "react";
import {getCompany} from "../../../../services/movingBoxesServices/adminServices/CompaniesService";
import {getUsers} from "../../../../services/movingBoxesServices/adminServices/UserService";
import {Link, useParams, useNavigate} from "react-router-dom";
import {saveDetails} from "../../../../services/movingBoxesServices/adminServices/CompaniesService";
import {Loader} from "../../../../views/Loader";

const EditCompany = () => {
    const [state, setState] = useState({
        hasError: false,
        loading: true,
        company: {
            name: '',
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            business_number: '',
            private_key: '',
            secret_key: '',
            api_key: '',
            status: '',
        },
    });

    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const company = await getCompany(id);
           setState({...state, company, loading: false})
        }

        __init();

    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, company: {
                ...state.company,
                [key]: value
            }
        })
    }

    const onSave = async (id: any) => {
        setState({...state, hasError: false, loading: true});

        if (
            !state.company.first_name ||
            !state.company.last_name ||
            !state.company.email ||
            !state.company.phone ||
            !state.company.address
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){
            const res = await saveDetails(id, state.company);

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
                                        <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.company.name ? 'is-invalid' : ''}`} id="name"
                                                   placeholder="John" defaultValue={state.company.name} onChange={(val: any) => onInputChange('name', val)} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">First name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.company.first_name ? 'is-invalid' : ''}`} id="first_name"
                                                   placeholder="John" defaultValue={state.company.first_name} onChange={(val: any) => onInputChange('first_name', val)} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="last_name" className="col-sm-3 col-form-label">Last name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.company.last_name ? 'is-invalid' : ''}`} id="last_name"
                                                   placeholder="Doe" defaultValue={state.company.last_name} onChange={(val: any) => onInputChange('last_name', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-sm-3 col-form-label">E-mail</label>
                                        <div className="col-sm-9">
                                            <input type="email" className={`form-control ${state.hasError && !state.company.email ? 'is-invalid' : ''}`} id="email"
                                                   placeholder="john.doe@email.com" defaultValue={state.company.email} onChange={(val: any) => onInputChange('email', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="phone" className="col-sm-3 col-form-label">Phone</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.company.phone ? 'is-invalid' : ''}`} id="phone"
                                                   placeholder="045000000" defaultValue={state.company.phone} onChange={(val: any) => onInputChange('phone', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="address" className="col-sm-3 col-form-label">Address</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.company.address ? 'is-invalid' : ''}`} id="address"
                                                   placeholder="Esimerkikatu 1, Helsinki" defaultValue={state.company.address} onChange={(val: any) => onInputChange('address', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="business_number" className="col-sm-3 col-form-label">Business number</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="business_number"
                                                   placeholder="100000000" defaultValue={state.company.business_number} onChange={(val: any) => onInputChange('business_number', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="private_key" className="col-sm-3 col-form-label">Private key</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="private_key"
                                                   placeholder="Private key" defaultValue={state.company.private_key} onChange={(val: any) => onInputChange('private_key', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="api_key" className="col-sm-3 col-form-label">API key</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="api_key"
                                                   placeholder="Api key" defaultValue={state.company.api_key} onChange={(val: any) => onInputChange('api_key', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="secrete_key" className="col-sm-3 col-form-label">Secrete key</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="secrete_key" disabled={true}
                                                   placeholder="Secret key" defaultValue={state.company.secret_key} onChange={(val: any) => onInputChange('secret_key', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="status" className="col-sm-3 col-form-label">Status</label>
                                        <div className="col-sm-9">
                                            <select className={`form-control`} name="status" id="status"
                                                    value={state.company.status}
                                                    onChange={(val: any) => onInputChange('status', val)} >
                                                <option selected={true}>-- Select Status --</option>
                                                <option value={'1'}>ACTIVE</option>
                                                <option value={'0'}>INACTIVE</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={() => onSave(id)}>
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


export default EditCompany;