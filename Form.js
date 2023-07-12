import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';

const Form = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [tasks, setTasks] = useState([]);

  const onSubmit = (data) => {
    setTasks((prevTasks) => [...prevTasks, data]);
  };

  const handleDownloadExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(tasks);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Task Update');
    const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelFile = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(excelFile, 'task_update.xlsx');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text('Submitted Tasks', 10, 10);

    tasks.forEach((task, index) => {
      const y = 20 + (index * 10);
      doc.text(`Start Time: ${task.startTime}`, 10, y);
      doc.text(`End Time: ${task.endTime}`, 50, y);
      doc.text(`Task: ${task.task}`, 90, y);
      doc.text(`Status: ${task.status}`, 130, y);
      doc.text(`Comments: ${task.comments}`, 170, y);
    });

    doc.save('task_update.pdf');
  };

  const handleAddTask = () => {
    reset({
      startTime: '',
      endTime: '',
      task: '',
      status: '',
      comments: ''
    });
  };

  return (
    <div className="container">
      <h1 className="text-center">Hourly Task Update Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" {...register('name', { required: true })} />
          {errors.name && <span className="text-danger">Name is required.</span>}
        </div>
        <div className="form-group">
          <label htmlFor="profile">Profile</label>
          <input type="text" className="form-control" id="profile" {...register('profile', { required: true })} />
          {errors.profile && <span className="text-danger">Profile is required.</span>}
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input type="date" className="form-control" id="date" {...register('date', { required: true })} />
          {errors.date && <span className="text-danger">Date is required.</span>}
        </div>
        <div className="form-group">
          <label htmlFor="projectName">Project Name</label>
          <input type="text" className="form-control" id="projectName" {...register('projectName', { required: true })} />
          {errors.projectName && <span className="text-danger">Project Name is required.</span>}
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Start Time</label>
          <input type="time" className="form-control" id="startTime" {...register('startTime', { required: true })} />
          {errors.startTime && <span className="text-danger">Start Time is required.</span>}
        </div>
        <div className="form-group">
          <label htmlFor="endTime">End Time</label>
          <input type="time" className="form-control" id="endTime" {...register('endTime', { required: true })} />
          {errors.endTime && <span className="text-danger">End Time is required.</span>}
        </div>
        <div className="form-group">
          <label htmlFor="task">Task you're Working</label>
          <textarea className="form-control" id="task" rows="3" {...register('task', { required: true })}></textarea>
          {errors.task && <span className="text-danger">Task is required.</span>}
        </div>
        <div className="form-group">
          <label htmlFor="status">Status in Detail</label>
          <textarea className="form-control" id="status" rows="3" {...register('status', { required: true })}></textarea>
          {errors.status && <span className="text-danger">Status is required.</span>}
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments</label>
          <textarea className="form-control" id="comments" rows="3" {...register('comments', { required: true })}></textarea>
          {errors.comments && <span className="text-danger">Comments are required.</span>}
        </div>

        <div className="text-center">
          <button type="button" className="btn btn-success" onClick={handleAddTask}>ADD</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>

      </form>

      {tasks.length > 0 && (
        <div className="mt-4">
          <h2 className="text-center">Submitted Tasks</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Task you're Working</th>
                <th>Status</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.startTime}</td>
                  <td>{task.endTime}</td>
                  <td>{task.task}</td>
                  <td>{task.status}</td>
                  <td>{task.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-center">
            <button type="button" className="btn btn-primary" onClick={handleDownloadExcel}>Download Excel</button>
            <button type="button" className="btn btn-primary" onClick={handleDownloadPDF}>Download PDF</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
