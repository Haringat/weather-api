export default abstract class WeatherDataPoint<T extends string | number> {
    public id: string;
    public value: T;
    public stationId: string;
    public capabilityId: string;
    public date: Date;
    public dateOfMeasure: Date;
}
