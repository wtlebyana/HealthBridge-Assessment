import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vehicle } from '../model/Vehicle';
import { CollectionReference, DocumentData } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class VehicleService {

  private vehiclesRef: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) {
    this.vehiclesRef = collection(this.firestore, 'vehicles') as CollectionReference<DocumentData>;
  }

  /**
   * Get all vehicles
   */
  getVehicles(): Observable<Vehicle[]> {
    return collectionData(this.vehiclesRef, { idField: 'id' }) as Observable<Vehicle[]>;
  }

  /**
   * Add a new vehicle
   */
  async addVehicle(vehicle: Vehicle): Promise<void> {
    await addDoc(this.vehiclesRef, vehicle);
  }

}
