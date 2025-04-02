import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  increment, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  Timestamp, 
  addDoc 
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

// User points management
export async function getUserPoints(userId: string): Promise<number> {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists() && userDoc.data().points !== undefined) {
      return userDoc.data().points;
    } else {
      // Initialize user points if they don't exist
      await setDoc(userRef, { points: 0 }, { merge: true });
      return 0;
    }
  } catch (error) {
    console.error("Error getting user points:", error);
    return 0;
  }
}

export async function addPoints(userId: string, points: number, item: string, category: string): Promise<boolean> {
  try {
    // Update user points
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      points: increment(points)
    });
    
    // Add activity record
    await addDoc(collection(db, 'activities'), {
      userId,
      type: 'Recycled',
      item,
      category,
      points,
      date: Timestamp.now()
    });
    
    return true;
  } catch (error) {
    console.error("Error adding points:", error);
    return false;
  }
}

export async function redeemPoints(userId: string, points: number, rewardTitle: string): Promise<boolean> {
  try {
    // Get current user points to verify they have enough
    const currentPoints = await getUserPoints(userId);
    
    if (currentPoints < points) {
      return false; // Not enough points
    }
    
    // Update user points (subtract)
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      points: increment(-points)
    });
    
    // Add redemption record
    await addDoc(collection(db, 'redemptions'), {
      userId,
      rewardTitle,
      points,
      date: Timestamp.now(),
      status: 'Completed'
    });
    
    return true;
  } catch (error) {
    console.error("Error redeeming points:", error);
    return false;
  }
}

export async function getUserActivities(userId: string): Promise<any[]> {
  try {
    const activitiesRef = collection(db, 'activities');
    const q = query(
      activitiesRef, 
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const activities = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert Firestore timestamp to string for display
      date: formatTimestamp(doc.data().date)
    }));
    
    return activities;
  } catch (error) {
    console.error("Error getting user activities:", error);
    return [];
  }
}

export async function getUserRedemptions(userId: string): Promise<any[]> {
  try {
    const redemptionsRef = collection(db, 'redemptions');
    const q = query(
      redemptionsRef, 
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const redemptions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert Firestore timestamp to string for display
      date: formatTimestamp(doc.data().date)
    }));
    
    return redemptions;
  } catch (error) {
    console.error("Error getting user redemptions:", error);
    return [];
  }
}

// Helper function to format Firestore timestamps to readable date strings
function formatTimestamp(timestamp: any): string {
  if (!timestamp) return '';
  
  const date = timestamp.toDate();
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }
}

export { db }; 