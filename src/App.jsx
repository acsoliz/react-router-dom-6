import './App.css';
import { Route, Routes, Link, useParams, Outlet, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { NavLink } from './NavLink.jsx';
import { useAuth } from './useAuth.jsx';

function Home() {
	return <h1>Home</h1>;
}


function SearchPage() {
	const sports = [ 'crossfit', 'box', 'spinning', 'muaythai' ];
	return (
		<div>
			<h1>SearchPage</h1>
			<ul>
				{sports.map((e, i) => (
					<li key={i}>
						<Link to={`/sports/${e}`}>{e}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

function Sports() {
	const { name } = useParams();
	return (
		<div>
			<h1>Sports</h1>
			<h2>{name}</h2>
			<Link to="details">Ir a los detalles</Link>
			<Outlet />
		</div>
	);
}
function SportDetails() {
	const { sport } = useParams();

	return <h1>Sport Details {sport}</h1>;
}

function Login() {
	const {login} = useAuth()
	const navigate = useNavigate()
	const {state} = useLocation()

	const handleClick=()=>{
		login()
		navigate(state?.location?.pathname?? '/')
	}
	return (
		<div>
			<button onClick={handleClick}>Login</button>
		</div>
	);
}
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();
	const location = useLocation()// tiene informacion de donde esta el usuariuo en ese momento
	if (!isAuthenticated) {
		return <Navigate to="/login" state={{location}}/>;
	}
	return children;
};

function App() {
	return (
		<div className="App">
			<header>
				<h1>PageName</h1>
				<nav>
					<ul>
						<li>
							<NavLink to="/">Home</NavLink>
						</li>
						<li>
							<NavLink to="/search-page">SearchPage</NavLink>
						</li>
					</ul>
				</nav>
			</header>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/search-page"
					element={
						<ProtectedRoute>
							<SearchPage />
						</ProtectedRoute>
					}
				/>
				<Route path="/sports/:name" element={<ProtectedRoute>
							<Sports />
						</ProtectedRoute>}>
					<Route path="details" element={<SportDetails />} />
				</Route>
				<Route path="login" element={<Login />} />
				<Route
					path="*"
					element={
						<div>
							<h1>NOT FOUND</h1>
						</div>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
