import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import { addUnit } from "../../../../services/movingServiceServices/companyServices/UnitService";
import { getCompanyDetails } from "../../../../services/movingServiceServices/companyServices/CompaniesService";
import {getMsCompanyId, GMAPKEY} from "../../../../config";
import { Unit } from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IUnit";
import {Company} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/ICompany";
import ImageConfirm from "../shared/ImageConfirm";
import {Loader} from "../../../../views/Loader";
import Autocomplete from "react-google-autocomplete";
import {IRegion} from "../../../../interfaces/movingServiceInterfaces/companyInterfaces/IRegion";
import {getRegions} from "../../../../services/movingServiceServices/companyServices/RegionService";

const CreateUnit = () => {
    const [state, setState] = useState({
        unitDetails: {} as Unit,
        regions: [] as IRegion[],
        company: {} as Company,
        loading: true,
        modalOpen: false,
        hasError: false,
    });

    const [image, setImage] = useState('');
    const [address, setAddress] = useState<string>('');

    let navigate = useNavigate();

    const handleSelectImage = (src: string) => {
        setImage(src);
    };

    const handleOpenImageConfirm = () => {
        setState({...state, modalOpen: true});
    };

    const handleCloseImageConfirm = (confirm: any) => {
        setState({...state, modalOpen: false});
        if (confirm === 'cancel') {
            setImage('');
        }
    };

    useEffect(() => {
        const __init = async () => {
            const companyId = await getMsCompanyId();
            const company = await getCompanyDetails(companyId);
            const regions = await getRegions();
            setState({...state, company, regions, loading: false});
        }

        __init();

    }, []);

    const onAddressChange = (place: any) => {
        let city = "";
        place.address_components.forEach((addressComponent: any) => {
            if (addressComponent.types[0] === "locality") {
                city = addressComponent.long_name;
            }
        });

        setAddress(place.formatted_address);
    };

    const onInputChange = (key: string, val: any) => {
        const value = val.target ? val.target.value : '';

        setState({
            ...state, unitDetails: {
                ...state.unitDetails, [key]: value
            }
        })
    }

    const onCreate = async () => {
        setState({...state, hasError: false});

        if (
            !state.unitDetails.price ||
            !state.unitDetails.persons ||
            !state.unitDetails.capacity ||
            !state.unitDetails.max_shift
        ){
            setState({
                ...state,
                hasError: true
            })

            return;
        }

        try{
            if (!state.hasError){
                const data = {
                    company_id: state.company.id,
                    region_id: state.unitDetails.region_id,
                    name: state.unitDetails.name,
                    address: address,
                    price: state.unitDetails.price,
                    persons: state.unitDetails.persons,
                    capacity: state.unitDetails.capacity,
                    availability: 1,
                    max_shift: state.unitDetails.max_shift,
                    start_time: state.unitDetails.start_time,
                    end_time: state.unitDetails.end_time,
                    image: image,
                }

                const res = await addUnit(data);
            
                if (res) {
                    navigate('/units');
                }
            }
        }catch(e){
            return;
        }
    };

    const renderRegions = () => {
        return(
            state.regions.map(region => (
                <option value={region.id} key={region.id}>{region.name}</option>
            ))
        )
    }

    if (state.loading) {
        return <>
            <div className="loader-container">
                <Loader color='#3642e8' width={50}/>
            </div>
        </>
    }

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title text-uppercase">Unit Details</h3>
                                </div>

                                <div className="form-horizontal">
                                    <div className="card-body">

                                        <div className="form-group row">
                                            <label htmlFor="business_number" className="col-sm-3 col-form-label">Company
                                                Id</label>
                                            <div className="col-sm-9">
                                                <select className={`form-control`} name="company_id" id="company_id"
                                                        defaultValue={state.company.id}>
                                                    <option
                                                        value={state.unitDetails.company_id}>{state.company.name}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="region_id" className="col-sm-3 col-form-label">Region</label>
                                            <div className="col-sm-9">
                                                <select
                                                    name="region_id"
                                                    id="region_id"
                                                    className={`form-control`}
                                                    onChange={(val: any) => onInputChange('region_id', val)}
                                                    value={state.unitDetails.region_id}
                                                >
                                                    <option value={''}>-- Choose region --</option>
                                                    {renderRegions()}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="name" className="col-sm-3 col-form-label">Name</label>
                                            <div className="col-sm-9">
                                                <input type="text"
                                                       className={`form-control ${state.hasError && !state.unitDetails.name ? 'is-invalid' : ''}`}
                                                       id="name"
                                                       placeholder=""
                                                       onChange={(val: any) => onInputChange('name', val)}/>
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
                                            <label htmlFor="price" className="col-sm-3 col-form-label">Price</label>
                                            <div className="col-sm-9">
                                                <input type="text"
                                                       className={`form-control ${state.hasError && !state.unitDetails.price ? 'is-invalid' : ''}`}
                                                       id="price"
                                                       placeholder="0.00"
                                                       onChange={(val: any) => onInputChange('price', val)}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="persons" className="col-sm-3 col-form-label">Persons</label>
                                            <div className="col-sm-9">
                                                <input type="text"
                                                       className={`form-control ${state.hasError && !state.unitDetails.persons ? 'is-invalid' : ''}`}
                                                       id="persons"
                                                       placeholder="0"
                                                       onChange={(val: any) => onInputChange('persons', val)}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="capacity"
                                                   className="col-sm-3 col-form-label">Capacity</label>
                                            <div className="col-sm-9">
                                                <input type="text"
                                                       className={`form-control ${state.hasError && !state.unitDetails.capacity ? 'is-invalid' : ''}`}
                                                       id="capacity"
                                                       placeholder="0"
                                                       onChange={(val: any) => onInputChange('capacity', val)}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="image" className="col-sm-3 col-form-label">Image</label>
                                            <div className="col-sm-9">
                                                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                                    <input readOnly={true} type="text"
                                                           className={`form-control ${state.hasError && !state.unitDetails.image ? 'is-invalid' : ''}`}
                                                           style={{width: "calc(100% - 30px)"}} id="image"
                                                           placeholder="" value={image}/> <span
                                                    className=" btn btn-outline-primary"
                                                    onClick={handleOpenImageConfirm}><i
                                                    className={"fas fa-plus"}></i></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="max_shift" className="col-sm-3 col-form-label">Max
                                                Shift</label>
                                            <div className="col-sm-9">
                                                <input type="text"
                                                       className={`form-control ${state.hasError && !state.unitDetails.max_shift ? 'is-invalid' : ''}`}
                                                       id="max_shift"
                                                       placeholder="0"
                                                       onChange={(val: any) => onInputChange('max_shift', val)}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="start_time" className="col-sm-3 col-form-label">Start
                                                Time</label>
                                            <div className="col-sm-9">
                                                <input type="text"
                                                       className={`form-control ${state.hasError && !state.unitDetails.start_time ? 'is-invalid' : ''}`}
                                                       id="start_time"
                                                       placeholder="HH:mm"
                                                       onChange={(val: any) => onInputChange('start_time', val)}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label htmlFor="end_time" className="col-sm-3 col-form-label">End
                                                Time</label>
                                            <div className="col-sm-9">
                                                <input type="text"
                                                       className={`form-control ${state.hasError && !state.unitDetails.end_time ? 'is-invalid' : ''}`}
                                                       id="end_time"
                                                       placeholder="HH:mm"
                                                       onChange={(val: any) => onInputChange('end_time', val)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={onCreate}>
                                        {state.loading ? 'Saving...' : 'Save changes'}
                                    </button>
                                    <Link to={'/units'} className="btn btn-default float-right">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {state.modalOpen && <ImageConfirm
                title={'Select image'}
                isOpen={state.modalOpen}
                onClose={handleCloseImageConfirm}
                onSelectImage={handleSelectImage}
            />}
        </>
    );
}

export default CreateUnit