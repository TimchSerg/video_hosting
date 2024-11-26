function formatWorkTime(start_time: number, end_time: number): string{
  const start_hours_fixed = Math.trunc(start_time/60);
  const start_hours = start_hours_fixed ? Number(start_hours_fixed) : 0;
  const start_minutes = (start_time - (start_hours*60));
  const start_hours_string = String(start_hours).length === 1 ? '0' + String(start_hours) : String(start_hours);
  const start_minutes_string = String(start_minutes).length === 1 ? '0' + String(start_minutes) : String(start_minutes);

  const end_hours_fixed = end_time > 1439 ? Math.trunc((end_time - 1440)/60) : Math.trunc(end_time/60);
  const end_hours = end_hours_fixed ? Number(end_hours_fixed) : 0;
  const end_minutes = end_time > 1439 ? (end_time - 1440) - (end_hours*60) : (end_time - (end_hours*60));
  const end_hours_string = String(end_hours).length === 1 ? '0' + String(end_hours) : String(end_hours);
  const end_minutes_string = String(end_minutes).length === 1 ? '0' + String(end_minutes) : String(end_minutes);

  const result = start_hours_string + ':' + start_minutes_string + ' - ' + end_hours_string + ':' + end_minutes_string;

  return result;
}

export function formatTime(workings: any[]){
  if(!workings.length) return null;

  let result = {
    monday: 'Выходной',
    tuesday: 'Выходной',
    wednesday: 'Выходной',
    thursday: 'Выходной',
    friday: 'Выходной',
    saturday: 'Выходной',
    sunday: 'Выходной',
  }

  workings.forEach( r => {
    if(r.day.toString() === 'monday') result.monday = formatWorkTime(r.start_time, r.end_time)
    if(r.day.toString() === 'tuesday') result.tuesday = formatWorkTime(r.start_time, r.end_time)
    if(r.day.toString() === 'wednesday') result.wednesday = formatWorkTime(r.start_time, r.end_time)
    if(r.day.toString() === 'thursday') result.thursday = formatWorkTime(r.start_time, r.end_time)
    if(r.day.toString() === 'friday') result.friday = formatWorkTime(r.start_time, r.end_time)
    if(r.day.toString() === 'saturday') result.saturday = formatWorkTime(r.start_time, r.end_time)
    if(r.day.toString() === 'sunday') result.sunday = formatWorkTime(r.start_time, r.end_time)
  } )

  return result;
}