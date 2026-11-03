"""Finite physical-channel checks for the finite-deformation sister account.

Run from the repository root. These checks test exact small-sector identities
and achievable-rate constructions; they do not prove the uniform all-path
posterior-entropy converse.
"""
from __future__ import annotations
import argparse
import json
from pathlib import Path
import numpy as np


def h2(x):
    if x <= 0 or x >= 1:
        return 0.0
    return float(-x*np.log2(x)-(1-x)*np.log2(1-x))


def entropy(state):
    es=np.linalg.eigvalsh((state+state.conj().T)/2)
    es=es[es>1e-12]
    return float(-np.sum(es*np.log2(es)))


def kron_all(xs):
    ans=np.array([[1.]])
    for x in xs:
        ans=np.kron(ans,x)
    return ans


def physical_raising(n,r):
    up=np.array([[0.,1.],[0.,0.]])
    left=np.diag([r**-.5,r**.5])
    right=np.diag([r**.5,r**-.5])
    return sum(kron_all([left if j<i else up if j==i else right
                         for j in range(n)]) for i in range(n))


def embeddings(r):
    D=1+r*r;S=1+r*r+r**4
    T=np.zeros((4,3));T[0,0]=1;T[1,1]=D**-.5
    T[2,1]=r*D**-.5;T[3,2]=1
    A=np.zeros((8,2));A[2,0]=r*D**-.5;A[4,0]=-D**-.5
    A[3,1]=r*D**-.5;A[5,1]=-D**-.5
    B=np.zeros((8,2));B[1,0]=r*D/(D*S)**.5
    B[2,0]=-1/(D*S)**.5;B[4,0]=-r/(D*S)**.5
    B[3,1]=r*r/(D*S)**.5;B[5,1]=r**3/(D*S)**.5
    B[6,1]=-D/(D*S)**.5
    return T,A,B


def loss_kraus(embs,n,site):
    return [np.take(V.reshape([2]*n+[V.shape[1]]),b,axis=site)
            .reshape(2**(n-1),V.shape[1])/len(embs)**.5
            for V in embs for b in range(2)]


def choi(Ks):
    d=Ks[0].shape[1]
    return sum(np.outer(K.flatten(order='F'),K.flatten(order='F').conj())/d
               for K in Ks)


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output',type=Path)
    args=parser.parse_args()
    maps=units=rates=lower=flags=0
    max_map_error=max_spectrum_error=max_tp_error=max_eta_error=0.
    min_improvement=float('inf')
    for r in (1.,1.2,2.,3.):
        T,A,B=embeddings(r);E=physical_raising(3,r);F=E.T
        assert np.allclose(np.column_stack([A,B]).T@np.column_stack([A,B]),np.eye(4))
        for V in (A,B):
            assert np.allclose(E@V[:,0],0) and np.allclose(F@V[:,0],V[:,1])
            assert np.allclose(E@V[:,1],V[:,0]) and np.allclose(F@V[:,1],0)
        for n,embs in ((2,[T]),(3,[A,B])):
            for site in range(n):
                Ks=loss_kraus(embs,n,site);d=Ks[0].shape[1]
                tp=float(np.max(np.abs(sum(K.T@K for K in Ks)-np.eye(d))))
                max_tp_error=max(max_tp_error,tp);assert tp<2e-12
                J=choi(Ks);spectrum=np.linalg.eigvalsh(J)
                assert spectrum.min()>-2e-12 and abs(spectrum.sum()-1)<2e-12
                D=1+r*r;S=1+r*r+r**4
                if n==2:
                    expected=[(1+2*r*r)/(3*D),(r*r+2)/(3*D)]
                elif site in (0,2):
                    expected=[.25,.25,(r*r+2)/(4*S),r*r*(1+2*r*r)/(4*S)]
                else:
                    expected=[(1+(r*r-1)/S**.5)/4]*2+[(1-(r*r-1)/S**.5)/4]*2
                expected=np.sort([0.]*(len(spectrum)-len(expected))+expected)
                error=float(np.max(np.abs(spectrum-expected)))
                max_spectrum_error=max(max_spectrum_error,error);assert error<2e-12
                for a in range(d):
                    for b in range(d):
                        X=np.eye(d)[:,a:a+1]@np.eye(d)[b:b+1]
                        physical=sum(V@X@V.T for V in embs)/len(embs)
                        direct=np.trace(physical.reshape([2]*n*2),axis1=site,axis2=n+site)
                        direct=direct.reshape(2**(n-1),2**(n-1))
                        error=float(np.max(np.abs(direct-sum(K@X@K.T for K in Ks))))
                        max_map_error=max(max_map_error,error);assert error<2e-12
                        units+=1
                maps+=1
        # Actual conditional resource entropy, followed by flag-resolved hashing.
        one_loss_entropy=entropy(choi(loss_kraus([T],2,1)))
        for p in (.1,.2,.5,.8,.9):
            lam=(1+2*r*r)/(3*(1+r*r))
            rate=(1-p*p)*np.log2(3)-2*p*(1-p)*h2(lam)
            direct=(1-p)**2*np.log2(3)+2*p*(1-p)*(np.log2(3)-one_loss_entropy)
            ordinary=(1-p*p)*np.log2(3)-2*p*(1-p)
            assert abs(rate-direct)<2e-12
            if r==1:
                assert abs(rate-ordinary)<2e-12
            else:
                assert rate>ordinary+1e-10
                min_improvement=min(min_improvement,float(rate-ordinary))
            rates+=1
        # All flags retained: one-excitation amplitude damping and Jensen bound.
        for n in range(1,10):
            ws=r**(-2*np.arange(n,dtype=float));ws/=ws.sum()
            for p in (.1,.5,.9):
                mean_eta=mean_rate=total=0.
                for mask in range(1<<n):
                    ell=mask.bit_count();pr=p**ell*(1-p)**(n-ell)
                    eta=float(sum(ws[i] for i in range(n) if not mask&(1<<i)))
                    eta=min(1.,max(0.,eta))
                    A0=np.diag([1.,eta**.5])
                    A1=np.array([[0.,(1-eta)**.5],[0.,0.]])
                    assert abs(entropy(choi([A0,A1]))-h2((1-eta)/2))<2e-12
                    mean_eta+=pr*eta;mean_rate+=pr*(1-h2((1-eta)/2));total+=pr
                    flags+=1
                error=abs(mean_eta-(1-p));max_eta_error=max(max_eta_error,error)
                assert error<2e-12 and abs(total-1)<2e-12
                assert mean_rate>=1-h2(p/2)-2e-12
                lower+=1
    result={'status':'passed','conditional_maps':maps,'logical_matrix_units':units,
            'two_spin_rates':rates,'positive_rate_cases':lower,'erasure_flags':flags,
            'max_map_error':max_map_error,'max_spectrum_error':max_spectrum_error,
            'max_tp_error':max_tp_error,'max_mean_survival_error':max_eta_error,
            'minimum_tested_strict_R2_improvement':min_improvement,
            'scope':'finite exact-map and achievable-rate checks; the uniform all-path converse is analytical and owned by the sister project'}
    if args.output:
        args.output.parent.mkdir(parents=True,exist_ok=True)
        args.output.write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2))


if __name__=='__main__':
    main()
