
const LoadingScreen = ({ color }: { color: String }) => {
    return (
        <div className={`flex items-center justify-center space-x-7 bg-gradient-to-b to-neutral-800 px-5 py-5 ${color} h-80`}>
             <div 
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
        </div>
       
    )
}

export default LoadingScreen