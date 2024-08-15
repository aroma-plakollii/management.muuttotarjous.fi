import {Link, useNavigate, useParams} from "react-router-dom";
import {getCityDetails, saveCityDetails} from "../../../../services/movingBoxesServices/adminServices/CitiesService";
import {useEffect, useState} from "react";
import {Company} from "../../../../interfaces/movingBoxesInterfaces/adminInterfaces/ICompany";
import {getCompanies} from "../../../../services/movingBoxesServices/adminServices/CompaniesService";
import {getMbCompanyId} from "../../../../config";
import {Loader} from "../../../../views/Loader";

const EditCity = () => {
    const [state, setState] = useState({
        cityDetails: {
            company_id: getMbCompanyId(),
            name: '',
            price: '',
        },
        loading: true,
        hasError: false,
    });
    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const __init = async () => {
            const city = await getCityDetails(id);

            setState({...state, cityDetails: city, loading: false})
        }

        __init()
    }, []);

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, cityDetails: {
                ...state.cityDetails, [key]: value
            }
        });
    }

    const onSelectChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, cityDetails: {
                ...state.cityDetails, [key]: value
            }
        });
    }

    const onSave = async (id: any) => {
        setState({...state, hasError: false, loading: true});

        if (
            !state.cityDetails.name ||
            !state.cityDetails.price
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        if (!state.hasError){
            const res = await saveCityDetails(id, state.cityDetails);

            if (res) {
                setState({...state, loading: false})
                navigate('/cities')
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
                                <h3 className="card-title text-uppercase">City Details</h3>
                            </div>

                            <div className="form-horizontal">
                                <div className="card-body">

                                    <div className="form-group row">
                                        <label htmlFor="first_name" className="col-sm-3 col-form-label">City name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.cityDetails.name ? 'is-invalid' : ''}`} id="name"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('name', val)} defaultValue={state.cityDetails.name}/>
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label htmlFor="last_name" className="col-sm-3 col-form-label">Price</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={`form-control ${state.hasError && !state.cityDetails.price ? 'is-invalid' : ''}`} id="price"
                                                   placeholder="1.20" onChange={(val: any) => onInputChange('price', val)} defaultValue={state.cityDetails.price}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={() => onSave(id)}>
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

export default EditCity;