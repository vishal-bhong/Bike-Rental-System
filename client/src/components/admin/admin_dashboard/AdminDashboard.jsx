
import AdminNavbar from '../adminBars/adminNavbar/AdminNavbar';
import AdminSidebar from '../adminBars/adminSidebar/AdminSidebar';
import SectionThree from './dashboard_sections/SectionThree.jsx';
import Map from './dashboard_sections/Map.jsx';
import SectionOne from './dashboard_sections/SectionOne';


const Dashboard = () => {
    const admin = JSON.parse(localStorage.getItem('adminProfile'));

    if(!admin) {
        return (
            <>
             <h1 style={{ padding: '100px 0 0 150px', fontWeight: 'bold', color: 'red' }}>Please Log in as Admin to see the dashboard.. </h1>
            </>
        )
    }

    return (
        <>
        <AdminNavbar />
        <AdminSidebar />
        <div className='row'>
            <div className='col-4'>
                <SectionThree />
            </div>
            <div className='col-8'>                
                <SectionOne />
                <Map />                
            </div>
        </div>
        </>
    );
}

export default Dashboard;