import { mapProjectFromApiToVm } from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';

describe('pods/project/project.mapper specs', () => {
  describe('mapProjectFromApiToVm', () => {
    it('should return empty project when project is null or undefined', () => {
      const result1 = mapProjectFromApiToVm(null);
      const result2 = mapProjectFromApiToVm(undefined);

      expect(result1).toEqual(viewModel.createEmptyProject());
      expect(result2).toEqual(viewModel.createEmptyProject());
    });

    it('should map project with all properties correctly', () => {
      const project: apiModel.Project = {
        id: '1',
        name: 'Test Project',
        externalId: 'EXT-001',
        comments: 'Test comments',
        isActive: true,
        employees: [
          {
            id: 'emp-1',
            employeeName: 'John Doe',
            isAssigned: true,
          },
        ],
      };

      const result = mapProjectFromApiToVm(project);

      expect(result).toEqual({
        id: '1',
        name: 'Test Project',
        externalId: 'EXT-001',
        comments: 'Test comments',
        isActive: true,
        employees: [
          {
            id: 'emp-1',
            employeeName: 'John Doe',
            isAssigned: true,
          },
        ],
      });
    });

    it('should map project with minimal properties', () => {
      const project: apiModel.Project = {
        id: '2',
        name: 'Minimal Project',
        isActive: false,
        employees: [],
      };

      const result = mapProjectFromApiToVm(project);

      expect(result.id).toBe('2');
      expect(result.name).toBe('Minimal Project');
      expect(result.isActive).toBe(false);
      expect(result.employees).toEqual([]);
    });
  });
});
