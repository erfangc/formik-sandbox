import React from "react";

export class Submit extends React.Component {
    render() {
        return <button
            type="submit"
            className="px-4 py-1 rounded bg-blue-500 text-white font-bold col-span-2"
        >
            Submit
        </button>;
    }
}