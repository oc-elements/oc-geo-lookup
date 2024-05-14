/// <reference path="../polymer/types/polymer-element.d.ts" />
/// <reference path="../iron-ajax/iron-ajax.d.ts" />
/// <reference path="../polymer-decorators/polymer-decorators.d.ts" />
import query = Polymer.decorators.query;

@Polymer.decorators.customElement('oc-geo-lookup')
class OcGeoLookup extends Polymer.Element {

	@Polymer.decorators.property({type: String})
	private address: string;

	@query('#hereAjax')
	ironAjax: IronAjaxElement;

	private readonly geoLookupApi = "https://geocode.search.hereapi.com/v1/geocode";
	private readonly geoLookupApiId = "?apiKey=M3-FbEg4mCuiglJw5Cya82VCru9vHRL6j4UNZ-vA6lk";
	private readonly geoLookupApiCode = "&in=countryCode:ZAF";
	private readonly geoLookupApiSearch = "&q=";
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
