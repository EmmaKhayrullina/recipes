import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { Provider } from 'react-redux';
import useImageFile from './useImageFile';
import store from '../store/store';
import * as fileService from '../services/fileService';

describe('useImageFile hook', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  const { result } = renderHook(() => useImageFile(), { wrapper });

  test('should set file', () => {
    // Act
    act(() =>
      result.current.handleFileChange({
        persist: jest.fn(),
        target: {
          files: [{ url: 'testfile.jpeg', fileName: 'testfile.jpeg' }],
        },
      }),
    );
    // Assert
    expect(result.current.file).not.toBeNull();
  });

  test('should return default loading and uploadProgress with falsy values', () => {
    expect(result.current.imageLoading).toBeFalsy();
    expect(result.current.uploadProgress).toBeNull();
  });

  test('should upload image', () => {
    // Arrange
    const mockAddFile = jest.fn(() => ({
      on: () => Promise.resolve('fileUrl'),
    }));
    fileService.addFile = mockAddFile;

    // Act
    act(() => {
      jest.advanceTimersByTime(100);
      result.current.uploadData();
    });
    // Assert
    expect(fileService.addFile).toHaveBeenCalled();
  });

  test('should delete recipe image', () => {
    // Arrange
    const mockDeleteFile = jest.fn(() => Promise.resolve(true));
    fileService.deleteFile = mockDeleteFile;

    // Act
    act(() => {
      jest.advanceTimersByTime(100);
      result.current.deleteImage('imageName');
    });
    // Assert
    expect(fileService.deleteFile).toHaveBeenCalledWith('imageName');
  });

  test('should delete old image', () => {
    // Act
    act(() => {
      jest.advanceTimersByTime(100);
      result.current.deleteOldImage();
    });

    // Assert
    expect(fileService.deleteFile).toHaveBeenCalled();
  });
});
