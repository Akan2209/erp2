"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternshipService = void 0;
const internship_repository_1 = require("../repositories/internship.repository");
const client_1 = require("@prisma/client");
const repo = new internship_repository_1.InternshipRepository();
class InternshipService {
    async submitRequest(data) {
        return repo.createRequest({ ...data, status: client_1.RequestStatus.PENDING });
    }
    async listRequests(page, limit, userId) {
        const skip = (page - 1) * limit;
        return repo.listRequests(skip, limit, userId);
    }
    async processApproval(id, action, user) {
        const req = await repo.findRequestById(id);
        if (!req)
            throw new Error('Request not found');
        let newStatus = req.status;
        if (action === 'REJECT') {
            newStatus = client_1.RequestStatus.REJECTED;
            await repo.updateRequestStatus(id, newStatus);
            return { message: 'Request rejected' };
        }
        if (action === 'APPROVE') {
            if (req.status === client_1.RequestStatus.PENDING && user.isFaculty) {
                newStatus = client_1.RequestStatus.FACULTY_APPROVED;
                await repo.updateRequestStatus(id, newStatus);
                return { message: 'Request approved by Faculty' };
            }
            else if (req.status === client_1.RequestStatus.FACULTY_APPROVED && user.isMaster) {
                newStatus = client_1.RequestStatus.MASTER_APPROVED; // Or just fully APPROVED
                await repo.updateRequestStatus(id, newStatus);
                // After master approval, data is moved to internships table
                await repo.createInternship({
                    userId: req.userId,
                    companyName: req.companyName,
                    startDate: req.startDate,
                    endDate: req.endDate,
                });
                return { message: 'Request fully approved and moved to internships' };
            }
            else {
                throw new Error('Invalid state for approval by this role');
            }
        }
        throw new Error('Invalid action');
    }
}
exports.InternshipService = InternshipService;
