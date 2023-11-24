export function getColorBaseOnValue(item) {
    let color = "";
    if (item === 0) color = "text-yellow-500";
    else if (item < '0') color = "text-red-500";
    else color = "text-green-500";

    return color;
}