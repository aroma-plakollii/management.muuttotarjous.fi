import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {addCity} from "../../../../services/movingBoxesServices/adminServices/CitiesService";
import {Company} from "../../../../interfaces/movingBoxesInterfaces/adminInterfaces/ICompany";
import {getCompanies} from "../../../../services/movingBoxesServices/adminServices/CompaniesService";


const CreateCity = () => {
    const [state, setState] = useState({
        company_id: '',
        name: '',
        price: '',
        companies: [] as Company[],
        loading: false,
        hasError: false,
    });

    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const companies = await getCompanies();
            setState({...state, companies})
        }

        __init();

    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, ...state,
            [key]: value
        })
    }

    const onSelectChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, ...state,
            [key]: value
        })
    }

    const onCreate = async () => {
        setState({...state, hasError: false});

        if (
            !state.name ||
            !state.price
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){
            const data ={
                company_id: state.company_id,
                name: state.name,
                price: state.price,
            }

            const res = await addCity(data);

            if (res) {
                navigate('/cities');
            }
        }
    };

    const renderCompanies = () => {
        return(
            state.companies.map(company => (
                <option value={company.id} key={company.id}>{company.name}</option>
            ))
        )
    }

    return (
        <div className="content-header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title text-uppercase">City Details</h3>
                            </div>

                            <div className="form-horizontal">
                                <div className="card-body">

                                    <div className="form-group row">
                                        <label htmlFor="type" className="col-sm-3 col-form-label">Company</label>
                                        <div className="col-sm-9">
                                            <select
                                                name="type"
                                                id="type"
                                                className={`form-control`}
                                                onChange={(val: any) => onSelectChange('company_id', val)}
                                                value={state.company_id}
                                            >
                                                <option value={''}>-- Choose company --</option>
                                                {renderCompanies()}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">City Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.name ? 'is-invalid' : ''}`} id="name"
                                                   placeholder="Vantaa" onChange={(val: any) => onInputChange('name', val)} />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="last_name" className="col-sm-3 col-form-label">Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.price ? 'is-invalid' : ''}`} id="price"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('price', val)} />
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={onCreate}>
                                        {state.loading ? 'Saving...' : 'Save changes'}
                                    </button>
                                    <Link to={'/cities'} className="btn btn-default float-right">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateCity