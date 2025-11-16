import React from "react";
import AnimalViewModel from "../ViewModels/AnimalViewModel";
import AuthViewModel from "../ViewModels/AuthViewModel";
import CommentViewModel from "../ViewModels/CommentViewModel";
import ComplaintViewModel from "../ViewModels/ComplaintViewModel";
import PointsViewModel from "../ViewModels/PointsViewModel";
import PostViewModel from "../ViewModels/PostViewModel";
import ReportViewModel from "../ViewModels/ReportViewModel";
import ResourcesViewModel from "../ViewModels/ResourcesViewModel";
import ShelterViewModel from "../ViewModels/ShelterViewModel";
import UsefulLinkViewModel from "../ViewModels/UsefulLinkViewModel";
import UserViewModel from "../ViewModels/UserViewModel";
import VerificationViewModel from "../ViewModels/VerificationViewModel";
import { UserType } from "../Enums/UserType";
import { AnimalSpecies } from "../Enums/AnimalSpecies";
import { AnimalGender } from "../Enums/AnimalGender";
import { AnimalSize } from "../Enums/AnimalSize";
import { AdoptionStatus } from "../Enums/AdoptionStatus";
import { ActivityStatus } from "../Enums/ActivityStatus";
import { ComplaintCategory } from "../Enums/ComplaintCategory";
import { PostType } from "../Enums/PostType";
import { VerificationStatus } from "../Enums/VerificationStatus";
import { ComplaintStatus } from "../Enums/ComplaintStatus";

const TestPage: React.FC = () => {
    const animalVM = new AnimalViewModel();
    const authVM = new AuthViewModel();
    const commentVM = new CommentViewModel();
    const complaintVM = new ComplaintViewModel();
    const pointsVM = new PointsViewModel();
    const postVM = new PostViewModel();
    const reportVM = new ReportViewModel();
    const resourcesVM = new ResourcesViewModel();
    const shelterVM = new ShelterViewModel();
    const linkVM = new UsefulLinkViewModel();
    const userVM = new UserViewModel();
    const verificationVM = new VerificationViewModel();

    // Тестові дані
    const testData = {
        email: "test@test.com",
        password: "Qwerty123!",
        fullName: "Test User",
        phoneNumber: "+380501234567",
        userId: "614bc804-7897-4278-9fff-64d98ef605b7",
        shelterId: 1,
        animalId: 5,
        postId: 4,
        commentId: 1,
        complaintId: 1,
        pointsId: 1,
        reportId: 1,
        resourceId: 1,
        linkId: 1,
        verificationId: 1,
        contactPhone: "+380501112233",
        contactEmail: "test@example.com",
        contactLink: "http://example.com"

    };

    const handleTest = async (name: string, fn: () => Promise<any>) => {
        try {
            console.log(`🧪 Testing: ${name}`);
            const result = await fn();
            console.log(`✅ ${name} - Success:`, result);
            alert(`✅ ${name} - Success! Check console for details.`);
        } catch (error: any) {
            console.error(`❌ ${name} - Error:`, error);
            alert(`❌ ${name} - Error: ${error.message}`);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "monospace" }}>
            <h1>🧪 ViewModels Test Page</h1>
            <p>Click buttons to test endpoints. Check browser console for results.</p>
            
            {/* AuthViewModel */}
            <section style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px" }}>
                <h2>🔐 AuthViewModel</h2>
                <button onClick={() => handleTest("AuthViewModel.logIn", () => 
                    authVM.logIn(testData.email, testData.password)
                )}>Test logIn</button>
                
                <button onClick={() => handleTest("AuthViewModel.logout", () => 
                    authVM.logout(123)
                )}>Test logout (NOT IMPLEMENTED)</button>
                
                <button onClick={() => handleTest("AuthViewModel.signUpUnverified", () => 
                    authVM.signUpUnverified(testData.email, testData.password, testData.fullName, testData.phoneNumber)
                )}>Test signUpUnverified</button>
                
                <button onClick={() => handleTest("AuthViewModel.signUpVerified", () => 
                    authVM.signUpVerified(testData.email, testData.password, testData.fullName, testData.phoneNumber, UserType.Volunteer, [])
                )}>Test signUpVerified</button>
            </section>

            {/* AnimalViewModel */}
            <section style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px" }}>
                <h2>🐶 AnimalViewModel</h2>
                <button onClick={() => handleTest("AnimalViewModel.addAnimal", () => 
                    animalVM.addAnimal(testData.shelterId, "Rex", AnimalSpecies.Dog, "Labrador", AnimalGender.Male, 3, 25, AnimalSize.Medium, true, true, false, AdoptionStatus.AvailableForAdoption, new Date(), "Friendly dog", [] , [])
                )}>Test addAnimal</button>
                
                <button onClick={() => handleTest("AnimalViewModel.editAnimal", () => 
                    animalVM.editAnimal(testData.animalId, testData.shelterId, "Rex Updated", AnimalSpecies.Dog, "Labrador", AnimalGender.Male, 4, 26, AnimalSize.Medium, true, true, true, AdoptionStatus.Adopted, new Date(), "Updated friendly dog", [], [])
                )}>Test editAnimal</button>
                
                <button onClick={() => handleTest("AnimalViewModel.deleteAnimal", () => 
                    animalVM.deleteAnimal(testData.animalId)
                )}>Test deleteAnimal</button>
                
                <button onClick={() => handleTest("AnimalViewModel.getAnimalById", () => 
                    animalVM.getAnimalById(testData.animalId)
                )}>Test getAnimalById</button>
                
                <button onClick={() => handleTest("AnimalViewModel.getAnimalsByShelter", () => 
                    animalVM.getAnimalsByShelter(testData.shelterId)
                )}>Test getAnimalsByShelter</button>
            </section>

            {/* CommentViewModel */}
            <section style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px" }}>
                <h2>💬 CommentViewModel</h2>
                <button onClick={() => handleTest("CommentViewModel.addComment", () => 
                    commentVM.addComment(testData.postId, testData.userId, "Test comment content")
                )}>Test addComment</button>
                
                <button onClick={() => handleTest("CommentViewModel.editCommentStatus", () => 
                    commentVM.editCommentStatus(testData.commentId, ActivityStatus.Deleted)
                )}>Test editCommentStatus</button>
                
                <button onClick={() => handleTest("CommentViewModel.deleteComment", () => 
                    commentVM.deleteComment(testData.commentId)
                )}>Test deleteComment</button>
                
                <button onClick={() => handleTest("CommentViewModel.getCommentById", () => 
                    commentVM.getCommentById(testData.commentId)
                )}>Test getCommentById</button>
                
                <button onClick={() => handleTest("CommentViewModel.getCommentsByPost", () => 
                    commentVM.getCommentsByPost(testData.postId)
                )}>Test getCommentsByPost</button>
            </section>

            {/* ComplaintViewModel */}
            <section style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px" }}>
                <h2>⚠️ ComplaintViewModel</h2>
                <button onClick={() => handleTest("ComplaintViewModel.addComplaint", () => 
                    complaintVM.addComplaint(testData.userId, ComplaintCategory.Spam, testData.userId, testData.postId, null, "Test complaint")
                )}>Test addComplaint</button>
                
                <button onClick={() => handleTest("ComplaintViewModel.editComplaintStatus", () => 
                    complaintVM.editComplaintStatus(testData.complaintId, ComplaintStatus.Processed)
                )}>Test editComplaintStatus</button>
                
                <button onClick={() => handleTest("ComplaintViewModel.deleteComplaint", () => 
                    complaintVM.deleteComplaint(testData.complaintId)
                )}>Test deleteComplaint</button>
                
                <button onClick={() => handleTest("ComplaintViewModel.getAllComplaints", () => 
                    complaintVM.getAllComplaints()
                )}>Test getAllComplaints</button>
                
                <button onClick={() => handleTest("ComplaintViewModel.getComplaintById", () => 
                    complaintVM.getComplaintById(testData.complaintId)
                )}>Test getComplaintById</button>
            </section>

            {/* PointsViewModel */}
            <section style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px" }}>
                <h2>⭐ PointsViewModel</h2>
                <button onClick={() => handleTest("PointsViewModel.addPoints", () => 
                    pointsVM.addPoints(testData.userId, testData.userId, 8, "Great work!")
                )}>Test addPoints</button>
                
                <button onClick={() => handleTest("PointsViewModel.deletePoints", () => 
                    pointsVM.deletePoints(testData.pointsId)
                )}>Test deletePoints</button>
                
                <button onClick={() => handleTest("PointsViewModel.getAllPoints", () => 
                    pointsVM.getAllPoints()
                )}>Test getAllPoints</button>
                
                <button onClick={() => handleTest("PointsViewModel.getPointsById", () => 
                    pointsVM.getPointsById(testData.pointsId)
                )}>Test getPointsById</button>
                
                <button onClick={() => handleTest("PointsViewModel.getPointsByRecipient", () => 
                    pointsVM.getPointsByRecipient(testData.userId)
                )}>Test getPointsByRecipient</button>
                
                <button onClick={() => handleTest("PointsViewModel.getPointsByReviewer", () => 
                    pointsVM.getPointsByReviewer("reviewer-id")
                )}>Test getPointsByReviewer</button>
            </section>

            {/* PostViewModel */}
            <section style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px" }}>
                <h2>📝 PostViewModel</h2>
                <button onClick={() => handleTest("PostViewModel.addPost", () => 
                    postVM.addPost(testData.userId, PostType.Story, "Test Post", "This is test content", [], new Date(), "", "", "", "Kyiv")
                )}>Test addPost</button>
                
                <button onClick={() => handleTest("PostViewModel.editPost", () => 
                    postVM.editPost(testData.postId, "Updated content", new Date(), "", "", "", "Lviv")
                )}>Test editPost</button>
                
                <button onClick={() => handleTest("PostViewModel.editHelpRequestStatus", () => 
                    postVM.editHelpRequestStatus(testData.postId)
                )}>Test editHelpRequestStatus</button>
                
                <button onClick={() => handleTest("PostViewModel.editPostStatus", () => 
                    postVM.editPostStatus(testData.postId, ActivityStatus.Blocked)
                )}>Test editPostStatus</button>
                
                <button onClick={() => handleTest("PostViewModel.deletePost", () => 
                    postVM.deletePost(testData.postId)
                )}>Test deletePost</button>
                
                <button onClick={() => handleTest("PostViewModel.getAllPosts", () => 
                    postVM.getAllPosts()
                )}>Test getAllPosts</button>
                
                <button onClick={() => handleTest("PostViewModel.getPostById", () => 
                    postVM.getPostById(testData.postId)
                )}>Test getPostById</button>
                
                <button onClick={() => handleTest("PostViewModel.getPostsByUser", () => 
                    postVM.getPostsByUser(testData.userId)
                )}>Test getPostsByUser</button>
            </section>

            {/* ReportViewModel */}
            <section style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px" }}>
                <h2>📊 ReportViewModel</h2>
                <button onClick={() => handleTest("ReportViewModel.addReport", () => 
                    reportVM.addReport(testData.postId, "Test report text")
                )}>Test addReport</button>
                
                <button onClick={() => handleTest("ReportViewModel.deleteReport", () => 
                    reportVM.deleteReport(testData.reportId)
                )}>Test deleteReport</button>
                
                <button onClick={() => handleTest("ReportViewModel.getReportById", () => 
                    reportVM.getReportById(testData.reportId)
                )}>Test getReportById</button>
            </section>

            {/* ResourcesViewModel */}
            <section style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px" }}>
                <h2>📦 ResourcesViewModel</h2>
                <button onClick={() => handleTest("ResourcesViewModel.addResource", () => 
                    resourcesVM.addResource(testData.shelterId, "Food", "Dog Food", "Premium dry food", true)
                )}>Test addResource</button>
                
                <button onClick={() => handleTest("ResourcesViewModel.editResourceDescription", () => 
                    resourcesVM.editResourceDescription(testData.resourceId, "Updated description")
                )}>Test editResourceDescription</button>
                
                <button onClick={() => handleTest("ResourcesViewModel.editResourceIsPresent", () => 
                    resourcesVM.editResourceIsPresent(testData.resourceId)
                )}>Test editResourceIsPresent</button>
                
                <button onClick={() => handleTest("ResourcesViewModel.deleteResource", () => 
                    resourcesVM.deleteResource(testData.resourceId)
                )}>Test deleteResource</button>
                
                <button onClick={() => handleTest("ResourcesViewModel.getResourceById", () => 
                    resourcesVM.getResourceById(testData.resourceId)
                )}>Test getResourceById</button>
                
                <button onClick={() => handleTest("ResourcesViewModel.getResourcesByShelter", () => 
                    resourcesVM.getResourcesByShelter(testData.shelterId)
                )}>Test getResourcesByShelter</button>
            </section>

            {/* ShelterViewModel */}
            <section style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px" }}>
                <h2>🏠 ShelterViewModel</h2>
                <button onClick={() => handleTest("ShelterViewModel.addShelter", () => 
                    shelterVM.addShelter(testData.userId, "Happy Paws Shelter", "A shelter for dogs", "Kyiv, Ukraine", testData.contactPhone, testData.contactEmail, testData.contactLink)
                )}>Test addShelter</button>
                
                <button onClick={() => handleTest("ShelterViewModel.editShelter", () => 
                    shelterVM.editShelter(testData.shelterId, "Happy Paws Updated", "Updated description", "Lviv, Ukraine")
                )}>Test editShelter</button>
                
                <button onClick={() => handleTest("ShelterViewModel.getShelterById", () => 
                    shelterVM.getShelterById(testData.shelterId)
                )}>Test getShelterById</button>
            </section>

            {/* UsefulLinkViewModel */}
            <section style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px" }}>
                <h2>🔗 UsefulLinkViewModel</h2>
                <button onClick={() => handleTest("UsefulLinkViewModel.addUsefulLink", () => 
                    linkVM.addUsefulLink("Resources", "Vet Contacts", "https://example.com/vets")
                )}>Test addUsefulLink</button>
                
                <button onClick={() => handleTest("UsefulLinkViewModel.editUsefulLink", () => 
                    linkVM.editUsefulLink(testData.linkId, "Updated Title", "https://example.com/updated")
                )}>Test editUsefulLink</button>
                
                <button onClick={() => handleTest("UsefulLinkViewModel.deleteUsefulLink", () => 
                    linkVM.deleteUsefulLink(testData.linkId)
                )}>Test deleteUsefulLink</button>
                
                <button onClick={() => handleTest("UsefulLinkViewModel.getAllUsefulLinks", () => 
                    linkVM.getAllUsefulLinks()
                )}>Test getAllUsefulLinks</button>
                
                <button onClick={() => handleTest("UsefulLinkViewModel.getUsefulLinkById", () => 
                    linkVM.getUsefulLinkById(testData.linkId)
                )}>Test getUsefulLinkById</button>
            </section>

            {/* UserViewModel */}
            <section style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px" }}>
                <h2>👤 UserViewModel</h2>
                <button onClick={() => handleTest("UserViewModel.editUser", () => 
                    userVM.editUser(testData.userId, "updated@example.com", "NewPass123!", "Updated Name", "+380509999999")
                )}>Test editUser</button>
                
                <button onClick={() => handleTest("UserViewModel.deleteUser", () => 
                    userVM.deleteUser(testData.userId)
                )}>Test deleteUser</button>
                
                <button onClick={() => handleTest("UserViewModel.editUserStatus", () => 
                    userVM.editUserStatus(testData.userId, ActivityStatus.Deleted)
                )}>Test editUserStatus</button>
                
                <button onClick={() => handleTest("UserViewModel.getUserById", () => 
                    userVM.getUserById(testData.userId)
                )}>Test getUserById</button>
                
                <button onClick={() => handleTest("UserViewModel.getUserPointsNumber", () => 
                    userVM.getUserPointsNumber(testData.userId)
                )}>Test getUserPointsNumber</button>
                
                <button onClick={() => handleTest("UserViewModel.getUserVerificationStatus", () => 
                    userVM.getUserVerificationStatus(testData.userId)
                )}>Test getUserVerificationStatus</button>
            </section>

            {/* VerificationViewModel */}
            <section style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px" }}>
                <h2>✔️ VerificationViewModel</h2>
                <button onClick={() => handleTest("VerificationViewModel.getAllVerifications", () => 
                    verificationVM.getAllVerifications()
                )}>Test getAllVerifications</button>
                
                <button onClick={() => handleTest("VerificationViewModel.getVerificationById", () => 
                    verificationVM.getVerificationById(testData.verificationId)
                )}>Test getVerificationById</button>
                
                <button onClick={() => handleTest("VerificationViewModel.editVerificationStatus", () => 
                    verificationVM.editVerificationStatus(testData.verificationId, VerificationStatus.Verified)
                )}>Test editVerificationStatus</button>
            </section>

            <style>{`
                button {
                    margin: 5px;
                    padding: 8px 12px;
                    background: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-family: monospace;
                    font-size: 12px;
                }
                button:hover {
                    background: #0056b3;
                }
                h2 {
                    margin-top: 0;
                    color: #333;
                }
            `}</style>
        </div>
    );
};

export default TestPage;
