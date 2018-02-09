/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../iron-ajax/iron-ajax.d.ts" />
/// <reference path="../polymer-decorators/polymer-decorators.d.ts" />
import customElement = Polymer.decorators.customElement;
import property = Polymer.decorators.property;
import query = Polymer.decorators.query;

@customElement('oc-geo-lookup')
class OcGeoLookup extends Polymer.Element {

	@property({type: String})
	private address: string;

	@query('#hereAjax')
	ironAjax: IronAjaxElement;

	private readonly geoLookupApi = "https://geocoder.cit.api.here.com/6.2/geocode.json";
	private readonly geoLookupApiId = "?app_id=dA8G8BhM7Sk4otemmBo2";
	private readonly geoLookupApiCode = "&app_code=cfuOXw7_G9d13rGYyv99iw";
	private readonly geoLookupApiSearch = "&searchtext=";
	private readonly country = "South Africa";

	public getLocation(streetName: string, suburb: string, city: string): Promise<any> {
		const concatAddress = `${streetName} ,${suburb}, ${city}, ${this.country}`;
		const apiUrl = this.geoLookupApi +
			this.geoLookupApiId + this.geoLookupApiCode +
			this.geoLookupApiSearch + concatAddress;

		this.ironAjax.url = apiUrl;
		const requestItem = this.ironAjax.generateRequest();
		return requestItem.completes;
	}
}
