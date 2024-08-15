export const API = "http://127.0.0.1:8000/api";
export const GMAPKEY = "AIzaSyCzcvmKLAUO3TdD78Pc8Z0sYpJmntfnLc0";

export const HEADERS = {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    'Authorization': `Bearer ${localStorage.getItem('token')}`
}

export const getMsCompanyId = async () => {
    let company: any = localStorage.getItem("ms_company");

    return company;
}

export const getMbCompanyId = () => {
    let company: any = localStorage.getItem("mb_company");

    return company;
}