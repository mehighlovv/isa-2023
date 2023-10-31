import BloodStock from "src/modules/blood-stocks/blood-stock.entity";
import Complaint from "src/modules/complaints/complaint.entity";
import MedicalEquipment from "src/modules/medical-equipment/medical-equipment.entity";
import Rating from "src/modules/ratings/rating.entity";
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
    complaints: Complaint[];
    ratings: Rating[];
    medicalEquipment: MedicalEquipment[];
    constructor(name: string, description: string, address: string, workingHoursBegin: Date, workingHoursEnd: Date);
}
