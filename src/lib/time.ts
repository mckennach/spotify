export const millisToMinutesAndSeconds = (millis: number) => {
    const minutes: any = Math.floor(millis / 60000);
    const seconds: any = ((millis % 60000) / 1000).toFixed(0);
    // const result = seconds == 60 ?minutes + 1 + ":00"
    return seconds == 60 ? minutes + 1 + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}