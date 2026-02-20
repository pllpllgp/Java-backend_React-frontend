const BoardForm = () => {
  return (
      <div style={{maxWidth: '800px', margin: '0 auto'}}>
          <h2>게시글 작성</h2>
          <div style={{marginTop: '20px'}}>
              <div style={{marginBottom: '15px'}}>
                  <label style={{display: 'block', marginBottom: '5px'}}>제목</label>
                  <input type="text"
                         style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px'}}
                         placeholder="제목을 입력하세요"/>
              </div>
              <div style={{marginBottom: '15px'}}>
                  <label style={{display: 'block', marginBottom: '5px'}}>내용</label>
                  <textarea style={{
                      width: '100%',
                      height: '300px',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '4px'
                  }} placeholder="내용을 입력하세요"/>
              </div>
              <div style={{textAlign: 'right'}}>
                  <button style={{
                      padding: '10px 20px',
                      marginRight: '10px',
                      background: '#6c757d',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px'
                  }}>취소
                  </button>
                  <button style={{
                      padding: '10px 20px',
                      background: '#28a745',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px'
                  }}>저장
                  </button>
              </div>
          </div>
      </div>
  );
};

export default BoardForm;