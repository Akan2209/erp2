import { ProjectRepository } from '../repositories/project.repository';

const repo = new ProjectRepository();

export class ProjectService {
    async submitRequest(data: any) {
        return repo.createRequest({ ...data, status: 'PENDING' });
    }

    async listRequests(page: number, limit: number, userId?: number) {
        const skip = (page - 1) * limit;
        return repo.listRequests(skip, limit, userId);
    }

    async processApproval(id: number, action: string, user: any) {
        const req = await repo.findRequestById(id);
        if (!req) throw new Error('Request not found');

        if (action === 'REJECT') {
            await repo.updateRequestStatus(id, 'REJECTED');
            return { message: 'Request rejected' };
        }

        if (action === 'APPROVE') {
            if (req.status === 'PENDING' && user.isFaculty) {
                await repo.updateRequestStatus(id, 'FACULTY_APPROVED');
                return { message: 'Request approved by Faculty' };
            } else if (req.status === 'FACULTY_APPROVED' && user.isMaster) {
                await repo.updateRequestStatus(id, 'MASTER_APPROVED');

                // After master approval, data is moved to projects table
                await repo.createProject({
                    studentId: req.studentId,
                    title: req.title,
                    description: req.description,
                    startDate: req.startDate,
                    endDate: req.endDate,
                });

                return { message: 'Request fully approved and moved to projects' };
            } else {
                throw new Error('Invalid state for approval by this role');
            }
        }

        throw new Error('Invalid action');
    }
}
