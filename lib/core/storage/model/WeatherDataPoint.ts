export default abstract class WeatherDataPoint {
    public id: string;
    public value: string | number;
    public stationId: string;
    public capabilityId: string;
    public date: Date;
    public dateOfMeasure: Date;
}
