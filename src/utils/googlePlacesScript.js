const loadGooglePlaces = (callback) => {
    const scriptExists = document.getElementById('google-places-script');
    if (!scriptExists) {
        const script = document.createElement('script');
        script.src= `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}&libraries=places`
        script.id = 'googlePlacesScript';
        script.type = "text/javascript";
        document.body.appendChild(script);

        script.onload = () => {
            if (callback) callback();
        }
    }

    if (scriptExists && callback) callback();
}

// const handleScriptLoad = () => {
//     console.log('loaded');
// }

let autoComplete;

function handleScriptLoad(updateQuery, inputRef) {
    const options = {
        componentRestrictions: { country: "in" },
        fields: ["address_components", "geometry", "icon", "name"],
        strictBounds: false,
        types: ["establishment"],
    }

    autoComplete = new window.google.maps.places.Autocomplete(inputRef.current,options);
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
        handlePlaceSelect(updateQuery)
    );
}

async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    console.log(addressObject);
}

export {loadGooglePlaces, handleScriptLoad};