import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "restaurants" })
export class Restaurant {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() category: string;
  @Column() cuisine: string;
  @Column() phone: string;
  @Column() email: string;
  @Column() latitude: number;
  @Column() longitude: number;
  @Column() owner: string;
  @Column() serves_breakfast: string;
  @Column() serves_lunch: string;
  @Column() serves_dinner: string;
  @Column() serves_takeaway: string;
  @Column() serves_delivery: string;
  @Column() outdoor_seating: string;
  @Column() indoor_seating: string;
  @Column() vegan_available: string;
  @Column() veg_available: string;
  @Column() nonveg_available: string;
  @Column() halaal_available: string;
  @Column() smoking: string;
  @Column() soft_drinks_available: string;
  @Column() hard_drinks_availbale: string;
  @Column() is_delivery_open: string;
}
