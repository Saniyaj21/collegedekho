import React from "react";

const TextOverFlowHandle = ({ text, size }) => {
	// pass the text and the maximum size you can handle after that it will add ...

	return <>{text?.length > size ? text?.slice(0, size) + " ..." : text}</>;
};

export default TextOverFlowHandle;
