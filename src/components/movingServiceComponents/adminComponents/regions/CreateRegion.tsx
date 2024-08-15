import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Loader} from "../../../../views/Loader";
import {IRegion} from "../../../../interfaces/movingServiceInterfaces/adminInterfaces/IRegion";
import {addRegion} from "../../../../services/movingServiceServices/adminServices/RegionService";
import Autocomplete from "react-google-autocomplete";
import {GMAPKEY} from "../../../../config";

const CreateRegion = () => {
    const [state, setState] = useState({
        loading: false,
        hasError: false,
    });

    const [region, setRegion] = useState({
        name: '',
        placeId: ''
    });

    let navigate = useNavigate();

    const onRegionChange = (place: any) => {
        let region = "";
        place.address_components.forEach((addressComponent: any) => {
            if (addressComponent.types[0] === "locality") {
                region = addressComponent.long_name;
            }
        });

        setRegion({name:place.formatted_address, placeId: place.place_id});
    };

    const onCreate = async () => {
        console.log(region.placeId)
        setState({...state, hasError: false});

        // if (
        //     region.name
        // ){
        //     setState({
        //         ...state,
        //         hasError: true
        //     })
        //
        //     return;
        // }

        if (!state.hasError){

            const data = {
                region_id: region.placeId,
                name: region.name,
            }

            const res = await addRegion(data);

            if (res) {
                navigate('/regions');
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
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title text-uppercase">Region Details</h3>
                                </div>

                                <div className="form-horizontal">
                                    <div className="card-body">

                                        {/*<div className="form-group row">*/}
                                        {/*    <label htmlFor="name" className="col-sm-3 col-form-label">Region Name</label>*/}
                                        {/*    <div className="col-sm-9">*/}
                                        {/*        <input type="text" className={`form-control ${state.hasError && !state.regionDetails.name ? 'is-invalid' : ''}`} id="name"*/}
                                        {/*               placeholder="fi" onChange={(val: any) => onInputChange('name', val)} />*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}

                                        <div className="form-group row">
                                            <label htmlFor="address" className="col-sm-3 col-form-label">Region</label>
                                            <div className="col-sm-9">
                                                <Autocomplete
                                                    apiKey={GMAPKEY}
                                                    onPlaceSelected={onRegionChange}
                                                    options={{
                                                        types: ["(regions)"],
                                                        componentRestrictions: {country: "fi"},
                                                    }}
                                                    defaultValue={region.name}
                                                    id="address"
                                                    placeholder="Helsinki, Finland"
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-info" onClick={onCreate}>
                                            {state.loading ? 'Saving...' : 'Save changes'}
                                        </button>
                                        <Link to={'/regions'} className="btn btn-default float-right">Cancel</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateRegion;