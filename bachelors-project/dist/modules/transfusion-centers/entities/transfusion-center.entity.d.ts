import BloodStock from "src/modules/blood-stocks/blood-stock.entity";
import Term from "src/modules/terms/term.entity";
import User from "src/modules/users/entities/user.entity";
export default class TransfusionCenter {
    id: string;
    name: string;
    address: string;
    description: string;
    workingHoursBegin: Date;
    workingHoursEnd: Date;
    bloodStocks: BloodStock[];
    administrators: User[];
    workingCalendar: Term[];
    constructor(name: string, description: string, address: string, workingHoursBegin: Date, workingHoursEnd: Date);
}
