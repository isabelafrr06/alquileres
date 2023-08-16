import spinner from "../assets/svg/spinner.svg";
export default function Spinner() {
	return (
		<div className="flex justify-center items-center fixed top-0 bottom-0 right-0 left-0">
			<div>
				<img src={spinner} alt="Cargando..." className="h-24" />
			</div>
		</div>
	);
}
